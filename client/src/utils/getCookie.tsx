//@ts-nocheck

export default function getCookie(cookieName) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + '=')) {
        const value = cookie.substring(cookieName.length + 1);
        return decodeURIComponent(value);
      }
    }
    return null; // Cookie not found
}
