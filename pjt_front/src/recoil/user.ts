import { atom, selector } from "recoil";

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(savedValue);
    }
  
    onSet( (newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(key)
        :  localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

  const sessionStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: any) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any, _: any, isReset: any) => {
      const confirm = newValue.length === 0;
      confirm
        ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const accessToken = atom({
    key: 'accessToken',
    default: "",
    effects: [
        localStorageEffect('accessToken'),
        // sessionStorageEffect('accessToken')
    ]
})

export {accessToken}
