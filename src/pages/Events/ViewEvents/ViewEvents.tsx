import { useDeleteEventsMutation, useGetUserEventDataByEmailQuery } from "../../../redux/api/apiSlice"
import { Table, Button, Image, } from 'react-bootstrap';
import { useContext } from 'react';
import { AuthContext } from "../../../context/AuthContext";
import Swal from "sweetalert2";

const ViewEvents = () => {
    // AUTH CONTEXT APIS
    const { user } = useContext(AuthContext)
    // REDUX QUERIES
    const { data } = useGetUserEventDataByEmailQuery(user)
    const [DeleteEvent] = useDeleteEventsMutation()
    // console.log('ViewEvents', data)

    const handleDelete = async (_id: string) => {

        try {
            const res = await DeleteEvent(_id)
            if (res && 'data' in res) {
                if (res?.data === "event deleted") {
                    Swal.fire({
                        icon: "success",
                        title: "Event deleted"
                    })
                }
            } else {
                console.error('Unhandled error:', res.error);
            }


        } catch (err) {
            console.log(err)
            Swal.fire({
                icon: "error",
                title: "Event deleted failed"
            })
        }
    }
    return (
        <div>
            <Table striped bordered responsive hover className="rounded shadow-sm mt-4">
                <thead>
                    <tr>
                        <th className="text-secondary">S/N</th>
                        <th className="text-secondary">Title</th>
                        <th className="text-secondary">Location</th>
                        <th className="text-secondary">Photo</th>
                        <th className="text-secondary">Start Date</th>
                        <th className="text-secondary">End Date</th>
                        <th className="text-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((item: { "_id": string, "title": string, "desc": string, "photos": string, "location": string, "startDate": string, "startTime": string }, index: number) => (
                            <tr key={index} className="">
                                <td className="text-muted">{index + 1}</td>
                                <td className="text-muted">{item?.title}</td>
                                <td className="text-muted">{item?.location}</td>
                                <td className="text-muted">
                                    <Image src={
                                        item?.photos ?
                                            item?.photos :
                                            "https://i.pinimg.com/originals/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.png"}
                                        alt={item?.title}
                                        style={{ width: '3rem', height: '3rem', objectFit: "contain" }}
                                    />
                                </td>

                                <td className="text-muted">21/10/2023</td>
                                <td className="text-muted">25/10/2023</td>
                                <td>
                                    <Button className="btn_up" onClick={() => handleDelete(item?._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </div>
    )
}

export default ViewEvents