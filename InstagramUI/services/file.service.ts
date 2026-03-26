import { BASE_ROUTE_URL } from "@/constants";
import { getLoggedUserToken } from "@/services/auth.service";

const route = "/files";

export const uploadFile = async (selectedFile: File) => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    const res = await fetch(`${BASE_ROUTE_URL}${route}/upload`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${await getLoggedUserToken()}`
        },
        body: formData
    });
    if(!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.Message || "An error occurred while uploading the file.");
    }
    const data = await res.json();
    return data.url;
}