import axios from 'axios';
import { API_Url, TIMEOUT_Sec } from '../config/config';

function timeOut(sec) {
    return new Promise(function(_, reject) {
        setTimeout(function() {
            reject(new Error(`Request took too long! Time after ${sec} second`));
        }, sec * 1000);
    });
}

export async function getResults(url) {
    try {
        const res = await Promise.race([axios(url), timeOut(TIMEOUT_Sec)]);
        return res;
    } catch (error) {
        throw error;
    }
}