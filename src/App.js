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
                <Text>{note}</Text>
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
              </Tr>
            </Thead>
            <Tbody>
              {allNotes.map((note, idx) => (
                <Tr key={idx}>
                  <Td>{idx + 1}</Td>
                  <Td>{note}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Route>
      </Switch>
    </Container>
  );
}
