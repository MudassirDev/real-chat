import { ref, set, onValue } from "firebase/database"
import { database } from "../config/firebase"
import { useEffect } from "react";

function Test() {
    function addSomeData() {
        console.log("adding some data")
        try {
            set(ref(database, 'users/' + "test"), {
                username: "test",
                email: "test",
                profile_picture: "test"
            });

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const dataRef = ref(database, 'users')
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
        });
    }, [])


    return (<>
        <button onClick={addSomeData}>Click me to test</button>
    </>)
}

export default Test
