import React, { useEffect, useState } from "react";
import axios from "axios";
import api from "../services/api";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const response = await api.get("/notifications");
            setNotifications(response.data.data);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const markAsRead = async (notificationId) => {
        try {
            await api.put(`/notifications/${notificationId}`, {});
            fetchNotifications();
            // toast message
        } catch (error) {
            console.error("Error marking notification as read:", error);
        }
    };

    const createNotification = async () => {
        try {
            // Implement your logic to create a new notification
            // using the appropriate API endpoint and request payload
        } catch (error) {
            console.error("Error creating notification:", error);
        }
    };

    return (
        <div>
            <h1>Notifications</h1>
            <ul>
                {notifications.map((notification) => (
                    <li key={notification.id}>
                        {notification.data.title}
                        {!notification.read_at && (
                            <button
                                className="btn btn-link"
                                onClick={() => markAsRead(notification.id)}
                            >
                                Mark as Read
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notification;
