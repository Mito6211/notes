import React, { useState, useEffect } from "react";
import { Container, Flex, Text, Box, Button, Textarea } from "@chakra-ui/react";

export default function App() {
  const [note, setNote] = useState(localStorage.getItem("note") || "");
  const [allNotes, setAllNotes] = useState(
    JSON.parse(localStorage.getItem("allNotes")) || []
  );

  useEffect(() => {
    localStorage.setItem("note", note);
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
  }, [note, allNotes]);

  return (
    <Container centerContent maxW="1000px">
      <Flex direction="column">
        <Textarea
          placeholder="Add a note here!"
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button
          onClick={() => {
            setAllNotes((prev) => [...prev, note]);
            setNote("");
          }}
        >
          Add Note
        </Button>
      </Flex>
      <Flex direction="column">
        {allNotes.map((note) => (
          <Box>
            <Text>{note}</Text>
          </Box>
        ))}
      </Flex>
    </Container>
  );
}
