import React from 'react';
import {Link} from "react-router-dom";

const LinksList = ({ links }) => {
    if(!links.length){
        return (
            <p className="center"> No links... </p>
        )
    }
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>from</th>
                        <th>to</th>
                        <th>open</th>
                    </tr>
                </thead>
                <tbody>
                { links.map(link => {
                    return (
                        <tr key={link._id}>
                            <td>{}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    )})
                }
                </tbody>
            </table>
        </div>
    );
};

export default LinksList;