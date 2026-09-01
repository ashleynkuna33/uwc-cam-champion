const BASE_URL = "http://localhost:8080/api";

export const apiFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");
    const isFormData = options.body instanceof FormData;

    const headers = {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    if (options.body && !isFormData && typeof options.body !== "string") {
        config.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
        throw new Error("Session expired. Please log in again.");
    }

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "An error occurred");
    }

    return response.status !== 204 ? response.json() : null;
};

// Reads the logged-in user's id out of whatever was stored at login.
export const getCurrentUserId = () => {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    try {
        return JSON.parse(raw).id ?? null;
    } catch {
        return null;
    }
};

export const fetchDashboard = (userId) => apiFetch(`/dashboard/${userId}`);

export const fetchUserTasksForModule = (moduleId, userId) =>
    apiFetch(`/user-tasks/module/${moduleId}/user/${userId}`);

export const updateUserTaskMark = (userTaskId, mark) =>
    apiFetch(`/user-tasks/${userTaskId}`, {
        method: "PATCH",
        body: { mark, isCompleted: true },
    });