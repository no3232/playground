/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import ReactDOM from "react-dom";
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { request, gql } from "graphql-request";

type Post = {
  id: Number;
  title: String;
  body: String;
}


interface PostInPosts {
  id: Number;
  title: String;
}

interface Posts {
  data: PostInPosts[]
}

interface PostsResponse {
  posts: Posts;
}

interface PostResponse {
  post: Post;
}

const endpoint = "https://graphqlzero.almansi.me/api";

const queryClient = new QueryClient();

function GraphQlPage() {
  const [postId, setPostId] = React.useState<Number>(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <p>
        As you visit the posts below, you will notice them in a loading state
        the first time you load them. However, after you return to this list and
        click on any posts you have already visited again, you will see them
        load instantly and background refresh right before your eyes!{" "}
        <strong>
          (You may need to throttle your network speed to simulate longer
          loading sequences)
        </strong>
      </p>
      {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

function usePosts() {
  return useQuery<PostInPosts[], Error>("posts", async () => {
    const {posts: { data },} = await request<PostsResponse>(
      endpoint,
      gql`
        query {
          posts {
            data {
              id
              title
            }
          }
        }
      `
    );
    console.log(data)
    return data;
  });
}

function Posts({ setPostId }: { setPostId: React.Dispatch<React.SetStateAction<Number>>}) {
  const queryClient = useQueryClient();
  const { status, data, error, isFetching } = usePosts();

  return (
    <div>
      <h1>Posts</h1>
      <div>
        {status === "loading" ? (
          "Loading..."
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : (
          <>
            <div>
              {data!.map((post, idx) => (
                <p key={idx}>
                  <a
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      // We can find the existing query data here to show bold links for
                      // ones that are cached
                      queryClient.getQueryData(["post", post.id])
                        ? {
                            fontWeight: "bold",
                            color: "green",
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? "Background Updating..." : " "}</div>
          </>
        )}
      </div>
    </div>
  );
}

function usePost(postId: Number) {
  return useQuery<Post, Error>(
    ["post", postId],
    async () => {
      const { post } = await request<PostResponse>(
        endpoint,
        gql`
        query {
          post(id: ${postId}) {
            id
            title
            body
          }
        }
        `
      );

      return post;
    },
    {
      enabled: !!postId,
    }
  );
}

function Post({ postId, setPostId }: {postId: Number, setPostId: React.Dispatch<React.SetStateAction<Number>>}) {
  const { status, data, error, isFetching } = usePost(postId);

  return (
    <div>
      <div>
        <a onClick={() => setPostId(-1)} href="#">
          Back
        </a>
      </div>
      {!postId || status === "loading" ? (
        "Loading..."
      ) : status === "error" ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <h1>{data!.title}</h1>
          <div>
            <p>{data!.body}</p>
          </div>
          <div>{isFetching ? "Background Updating..." : " "}</div>
        </>
      )}
    </div>
  );
}

export default GraphQlPage


// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from "react";
// import ReactDOM from "react-dom";
// import {
//   useQuery,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
// import { request, gql } from "graphql-request";

// const endpoint = "https://graphqlzero.almansi.me/api";

// const queryClient = new QueryClient();

// function GraphQlPage() {
//   const [postId, setPostId] = React.useState(-1);

//   return (
//     <QueryClientProvider client={queryClient}>
//       <p>
//         As you visit the posts below, you will notice them in a loading state
//         the first time you load them. However, after you return to this list and
//         click on any posts you have already visited again, you will see them
//         load instantly and background refresh right before your eyes!{" "}
//         <strong>
//           (You may need to throttle your network speed to simulate longer
//           loading sequences)
//         </strong>
//       </p>
//       {postId > -1 ? (
//         <Post postId={postId} setPostId={setPostId} />
//       ) : (
//         <Posts setPostId={setPostId} />
//       )}
//       <ReactQueryDevtools initialIsOpen />
//     </QueryClientProvider>
//   );
// }

// function usePosts() {
//   return useQuery("posts", async () => {
//     const {
//       posts: { data },
//     } = await request(
//       endpoint,
//       gql`
//         query {
//           posts {
//             data {
//               id
//               title
//             }
//           }
//         }
//       `
//     );
//     return data;
//   });
// }

// function Posts({ setPostId }) {
//   const queryClient = useQueryClient();
//   const { status, data, error, isFetching } = usePosts();

//   console.log(data)

//   return (
//     <div>
//       <h1>Posts</h1>
//       <div>
//         {status === "loading" ? (
//           "Loading..."
//         ) : status === "error" ? (
//           <span>Error: {error.message}</span>
//         ) : (
//           <>
//             <div>
//               {data.map((post) => (
//                 <p key={post.id}>
//                   <a
//                     onClick={() => setPostId(post.id)}
//                     href="#"
//                     style={
//                       // We can find the existing query data here to show bold links for
//                       // ones that are cached
//                       queryClient.getQueryData(["post", post.id])
//                         ? {
//                             fontWeight: "bold",
//                             color: "green",
//                           }
//                         : {}
//                     }
//                   >
//                     {post.title}
//                   </a>
//                 </p>
//               ))}
//             </div>
//             <div>{isFetching ? "Background Updating..." : " "}</div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// function usePost(postId) {
//   return useQuery(
//     ["post", postId],
//     async () => {
//       const { post } = await request(
//         endpoint,
//         gql`
//         query {
//           post(id: ${postId}) {
//             id
//             title
//             body
//           }
//         }
//         `
//       );

//       return post;
//     },
//     {
//       enabled: !!postId,
//     }
//   );
// }

// function Post({ postId, setPostId }) {
//   const { status, data, error, isFetching } = usePost(postId);

//   return (
//     <div>
//       <div>
//         <a onClick={() => setPostId(-1)} href="#">
//           Back
//         </a>
//       </div>
//       {!postId || status === "loading" ? (
//         "Loading..."
//       ) : status === "error" ? (
//         <span>Error: {error.message}</span>
//       ) : (
//         <>
//           <h1>{data.title}</h1>
//           <div>
//             <p>{data.body}</p>
//           </div>
//           <div>{isFetching ? "Background Updating..." : " "}</div>
//         </>
//       )}
//     </div>
//   );
// }
// export default GraphQlPage