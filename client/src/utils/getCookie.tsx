//@ts-nocheck

export default function getCookie(cookieName) {
    const cookie = document.cookie.split('; ').filter(row => row.startsWith('jwt=')).map(c=>c.split('=')[1])[0]
    return cookie
}
