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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function App() {
  const history = useHistory();
  const location = useLocation();
  const [note, setNote] = useState(
    JSON.parse(localStorage.getItem("note")) || { text: "", date: null }
  );
  const [allNotes, setAllNotes] = useState(
    JSON.parse(localStorage.getItem("allNotes")) || []
  );

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(note));
    localStorage.setItem("allNotes", JSON.stringify(allNotes));
  }, [note, allNotes]);

  return (
    <Container maxW="1000px">
      <Flex justify="center" align="center" my="20px">
        <Box>
          <Heading size="lg">Notes Demo</Heading>
        </Box>
        <Spacer />
        <Button
          colorScheme="orange"
          onClick={() =>
            history.push(location.pathname !== "/notes" ? "/notes" : "/")
          }
        >
          {location.pathname !== "/notes" ? "View Notes" : "Back"}
        </Button>
      </Flex>
      <Switch>
        <Route exact path="/">
          <Flex direction="column">
            <Textarea
              minH="300px"
              placeholder="Add a note here!"
              name="note"
              value={note.text}
              onChange={(e) =>
                setNote((prev) => ({ ...prev, text: e.target.value }))
              }
            />
            <Button
              onClick={() => {
                setAllNotes((prev) => [
                  ...prev,
                  { text: note.text, date: new Date().getTime() },
                ]);
                setNote({ text: "", date: null });
              }}
              colorScheme="orange"
              my="10px"
            >
              Add Note
            </Button>
          </Flex>
          <Flex direction="column">
            {allNotes.map((note, idx) => (
              <Flex my="5px" key={idx} align="center">
                <Button
                  colorScheme="red"
                  variant="outline"
                  mr="20px"
                  onClick={() =>
                    setAllNotes((prev) =>
                      prev.filter((note) => prev[idx] !== note)
                    )
                  }
                >
                  <MdClose />
                </Button>
                <Text>{note.text}</Text>
              </Flex>
            ))}
            {allNotes.length > 0 && (
              <Button
                colorScheme="red"
                onClick={() => setAllNotes([])}
                my="10px"
              >
                Delete All Notes
              </Button>
            )}
          </Flex>
        </Route>
        <Route path="/notes">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Number</Th>
                <Th>Note</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allNotes.map((note, idx) => (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{note.text}</Td>
                  <Td>{new Date(note.date).toLocaleTimeString()}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Route>
      </Switch>
    </Container>
  );
}
