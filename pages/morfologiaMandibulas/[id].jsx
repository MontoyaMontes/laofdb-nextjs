import Layout from "../../components/Layout"
import React, { useState, useEffect } from "react";

import Router, { useRouter } from "next/router";

export default function Page(props) {
    const { query, isReady } = useRouter();
    const [id, setId] = useState("")

    useEffect(() => {
        if (!isReady) {
            return
        };
        // console.log(query);
        setId(query.id)
        // console.log(id);
    }, [isReady, query.id])

    return (
        <Layout
            title={id} 
            description="{id}"
            morfologia
        >
            ID {id}
        </Layout>
    )
}
