<script>
import axios from 'axios'

export const contactsAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  }
});
</script>