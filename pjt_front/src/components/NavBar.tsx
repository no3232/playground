import { Link } from 'react-router-dom'

const NavBar = () => {
    return (<div className='fixed top-0 left-0 right-0'>
        <Link to="">메인페이지</Link>
        <Link to="GraphQLPage">그래프큐엘페이지</Link>
        <Link to="Login">로그인</Link>
    </div>)
}

export default NavBar