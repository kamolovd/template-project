import { red,amber,blue,green,grey,indigo } from "@mui/material/colors";


export const generateColorComment = () => {
    const list = [amber, red, blue,green,grey,indigo]
    const random = Math.floor(Math.random() * list.length);
    return list[random]
}