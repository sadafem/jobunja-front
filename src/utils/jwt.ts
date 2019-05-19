interface JwtPayload {
    exp: number,
}

export function parseJwt(token: string): JwtPayload {
    const base64Url = token.split('.')[1];
    const base64 = decodeURIComponent(atob(base64Url).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log(base64);
    return JSON.parse(base64);
}
