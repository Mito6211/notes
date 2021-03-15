import React, { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Text,
  Box,
  Button,
  Textarea,
  Heading,
  Spacer,
} from "@chakra-ui/react";

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
    <Container maxW="1000px">
      <Flex justify="center" align="center" my="20px">
        <Box p="2">
          <Heading size="lg">Notes Demo</Heading>
        </Box>
        <Spacer />
        <Button colorScheme="orange">View Notes</Button>
      </Flex>
      <Flex direction="column">
        <Textarea
          minH="300px"
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
          colorScheme="orange"
          my="10px"
        >
          Add Note
        </Button>
      </Flex>
      <Flex direction="column">
        {allNotes.map((note, idx) => (
          <Box key={idx}>
            <Text>{note}</Text>
          </Box>
        ))}
        {allNotes.length > 0 && (
          <Button colorScheme="red" onClick={() => setAllNotes([])} my="10px">
            Delete All Notes
          </Button>
        )}
      </Flex>
    </Container>
  );
}
