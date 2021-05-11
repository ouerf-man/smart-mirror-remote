import {APIURL} from "../config"
import axios from "axios"

export const getCurrentState= (id)=>{
    return axios.get(`${APIURL}/interface/${id}`)
        .then((res)=>{
            return res.data
        })
}

export const updateScreen= (id,body)=>{
    return axios.post(`${APIURL}/interface/${id}`,body)
        .then((res)=>{
            return res.data
        }).catch(e=>{
            console.log(e)
        })
}