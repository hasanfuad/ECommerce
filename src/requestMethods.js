import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZjc5YWU4MDFmNTFkNWI2MjA0Y2ZjMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0NTk4Mjk1OSwiZXhwIjoxNjQ2MjQyMTU5fQ.eY96Vnqn4P2XEdwnWjiofy7AnfyHZfoll6XfsX_4Vt8";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}`  },
});
