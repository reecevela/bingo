import React, { useEffect, useState } from "react";

const LeaderBoard = ({ users }) => {

    if (!users) {
        return (
            <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                    <div className="font-bold">Recent Submissions</div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between">
                <div className="font-bold">Recent Submissions</div>
            </div>
            {users.map((user, i) => (
                <div key={i} className="flex flex-row justify-between">
                    <div>{user.username}</div>
                </div>
            ))}
        </div>
    );
}

export default LeaderBoard;