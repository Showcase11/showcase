import { useEffect, useState } from "react";

const useUser = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token !== undefined && token !== null) {
            token = token.replace(/['"]+/g, "");

            fetch("http://3.110.108.123:5000/user/infor", {
                method: "GET",
                headers: {
                    Authorization: token,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => {
                    return res.json();
                })
                .then((data) => {
                    const id = data._id;
                    fetch(`http://3.110.108.123:5000/user/saved/${id}`, {
                        method: "GET",
                    })
                        .then((res) => {
                            return res.json();
                        })
                        .then((data) => {
                            setUser(data)
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [user])
    
    return [user]
}
export default useUser

