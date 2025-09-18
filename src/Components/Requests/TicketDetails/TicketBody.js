// TicketBody.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { Tabs, Tab, Box, Card, CardContent, Typography } from "@mui/material";
import { Button, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, useParams } from "react-router-dom";
import {
Container,
TicketRow,
ActionBar
} from "../../../styled_components/requestTicketDetails";
import TicketLeft from "./Details/TicketLeft";
import TicketRight from "./Details/TicketRight";
import TextEditor from "./Resolution/TextEditor";

// ---------- Main Wrapper ----------
export default function TicketBody() {
  return (
    <Container>
      <ActionBar>
            <Stack direction="row" spacing={1}>
                {/* Back button */}
                <Link to ='/request'>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  startIcon={<ArrowBackIcon />}
                />
                 </Link>

                {/* Edit */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "#ddd",
                    textTransform: "none",
                  }}
                >
                  Edit
                </Button>

                {/* Assign */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "#ddd",
                    textTransform: "none",
                  }}
                >
                  Assign
                </Button>

                {/* Reply */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "#ddd",
                    textTransform: "none",
                  }}
                >
                  Reply
                </Button>

                {/* Timer */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    backgroundColor: "#fff",
                    borderColor: "#ddd",
                    textTransform: "none",
                  }}
                >
                  Timer
                </Button>
              </Stack>
      </ActionBar>

      <TicketRow>
        <TicketLeft />
        <TicketRight />
      </TicketRow>
        
    </Container>
  );
}
