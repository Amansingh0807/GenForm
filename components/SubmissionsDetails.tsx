import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type Props = {
  submission: any;
  index: number;
};

const SubmissionsDetails: React.FC<Props> = ({ submission, index }) => {
 
  return (
    <div>
      <h1 className="font-bold text-2xl mb-4">Response - {index + 1}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Questions</TableHead>
            <TableHead>Answer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(submission?.content).map(([key, value], index:number) => ( 
            <TableRow key={index}>
              <TableCell>{key}</TableCell>
              <TableCell>{Array.isArray(value) ? value.join(", ") : String(value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubmissionsDetails;