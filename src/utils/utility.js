import { createTheme } from "@mui/material"

const fontTheme = createTheme({
    typography:{
        fontFamily: '"Wotfard", sans',
    }
});

function themeChange () {
    let usersTheme = "";

    if(localStorage.getItem('theme')){
        usersTheme = localStorage.getItem('theme');
    } else if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
        usersTheme = 'dark';
    } else {
        usersTheme = 'light';
    }

    return usersTheme;
}

export {
    fontTheme,
    themeChange
}
