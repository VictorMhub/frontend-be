import { useEffect, useState } from "react";
import beSVG from "../assets/beSVG.svg";
import lupeSVG from "../assets/lupeSVG.svg";
import ellipse from "../assets/ellipse.svg";
import vector from "../assets/vector.svg";
import toggledVector from "../assets/toggledVector.svg"

import { Input } from "../components/ui/input";
import {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from "../components/ui/table";

export function Home() {
  
  interface Employee {
    id: number;
    name: string;
    job: string;
    admission_date: string;
    phone: string;
    image: string;
  }

const [employees, setEmployees] = useState<Employee[]>([]);
const [search, setSearch] = useState("");
const [selectedEmployees, setSelectedEmployees] = useState<{ [key: number]: boolean }>({});


const toggleVector = (id: number): void => {
  setSelectedEmployees((prevSelected) => ({
    ...prevSelected,
    [id]: !prevSelected[id]
  }));
};

const formatPhoneNumber = (phoneNumber: string): string => {
  if (!phoneNumber) return "Número não cadastrado";
  const match = phoneNumber.match(/^(\d{2})(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
  }
  return phoneNumber;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

useEffect(() => {
  fetch("http://localhost:3000/employees")
    .then((response) => response.json())
    .then((data) => setEmployees(data));
}, []);

const filteredEmployees = search.length > 0
  ? employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.job.toLowerCase().includes(search.toLowerCase()) ||
        employee.phone.includes(search)
    )
  : employees;

return (
  <section className="flex flex-col w-full h-full gap-[28px]">
    <header className="flex w-full h-[60px] border-2 items-center shadow-md">
      <img className="pl-6" src={beSVG} alt="Be Icon" />
    </header>

    <div className="flex flex-col w-full gap-10 items-center">
      <div className="flex flex-col items-center justify-between w-full md:flex-row">
        <h4 className="font-roboto font-medium pl-6 text-[24px]">
          Funcionários
        </h4>
        <div className="relative flex items-center w-[287px] mr-[35px]">
          <Input
            className="flex-1 h-[48px] pl-4 pr-12 font-roboto text-[16px] rounded-lg"
            placeholder="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img src={lupeSVG} alt="Search Icon" className="absolute right-3" />
        </div>
      </div>
      <div className="w-4/5 pb-[141.5px]">
        <Table>
          <div className="bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-lg">
            <TableHeader className="flex justify-between md:justify-between">
              <TableHead className="text-white font-roboto font-medium text-center py-[12px]">
                FOTO
              </TableHead>
              <TableHead className="text-white font-roboto font-medium text-center py-[12px]">
                NOME
              </TableHead>
              <TableHead className="hidden md:table-cell text-white font-roboto font-medium text-center py-[12px]">
                CARGO
              </TableHead>
              <TableHead className="hidden md:table-cell text-white font-roboto font-medium text-center py-[12px]">
                DATA DE ADMISSÃO
              </TableHead>
              <TableHead className="hidden md:table-cell text-white font-roboto font-medium text-center py-[12px] mr-[30px]">
                TELEFONE
              </TableHead>
              <TableHead className="md:hidden text-white font-roboto font-medium text-center py-[12px] mr-[30px]">
                <img src={ellipse} alt="Ellipse SVG" />
              </TableHead>
            </TableHeader>
          </div>
          <TableBody className="border">
            {filteredEmployees.map((employee) => (
              <>
                <TableRow
                  key={employee.id}
                  className="flex justify-between md:justify-between items-center"
                >
                  <TableCell className="text-center">
                    <img
                      src={employee.image}
                      className="w-[34px] h-[34px] rounded-full"
                      alt="Employee Image"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    {employee.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    {employee.job}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    {formatDate(employee.admission_date)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-center">
                    {formatPhoneNumber(employee.phone)}
                  </TableCell>
                  <TableCell className="md:hidden text-center">
                    <img
                      src={selectedEmployees[employee.id] ? toggledVector : vector}
                      className="pr-[25px] md:hidden"
                      alt="Vector Icon"
                      onClick={() => toggleVector(employee.id)}
                    />
                  </TableCell>
                </TableRow>
                {selectedEmployees[employee.id] && (
                    <TableRow>
                      <TableCell className="p-3">
                        <div className="p-2">
                          <p className="mb-4 border-b border-dashed border-gray-300"><strong>Cargo:</strong> {employee.job}</p>
                          <p className="mb-4 border-b border-dashed border-gray-300"><strong>Data de Admissão:</strong> {formatDate(employee.admission_date)}</p>
                          <p className="mb-4 border-b border-dashed border-gray-300"><strong>Telefone:</strong> {formatPhoneNumber(employee.phone)}</p>
                        </div>
                      </TableCell>
                    </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </section>
);
}
