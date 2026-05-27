"use client";

import { Autocomplete, TextField } from "@mui/material";

export default function AutocompletePage() {
  return (
    <div className="bg-white rounded-md shadow p-3">
      <Autocomplete
        options={["Tesla", "BMW", "Mercedes-Benz", "Toyota", "Volkswagen"]}
        renderInput={(params) => <TextField {...params} label="Car" />}
      />
    </div>
  );
}
