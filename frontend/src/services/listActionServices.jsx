import api from "./api";
import Swal from "sweetalert2";
import {axiosErrorAlert} from "./errorServices";

/**
 * @param apiUrl : string | api url to delete
 * @param callback : Function | callback function to call after delete
 */
export function deleteAction(apiUrl: string, callback: Function) {
    if (confirm("Are you sure to Delete?")) {
        api.delete(apiUrl)
            .then((res) => {
                if (res.data.status) {
                    Swal.fire({
                        title: 'Success!',
                        text: res.data.message,
                        icon: 'success',
                        timer: 700,
                    })
                    callback()
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: res.data.message,
                        icon: 'error',
                    })
                }
            })
            .catch((err) => axiosErrorAlert(err))
    }
}

export function updateStatusAction(apiUrl: string, status: any, callback: Function) {
    if (!confirm("Are you sure to Update Status?")) return
    api.put(apiUrl, {
        is_active: status
    })
        .then((res) => {
            if (res.data.status) {
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    timer: 700,
                })
                callback()
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: res.data.message,
                    icon: 'error',
                })
            }
        })
        .catch((err) => axiosErrorAlert(err))
}