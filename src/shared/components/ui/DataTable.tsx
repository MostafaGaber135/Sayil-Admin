import { ReactNode } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { Card } from "@/shared/components/ui/card";

export type ColumnDef<T> = {
    header: string | ReactNode;
    cell: (row: T) => ReactNode;
    headerClassName?: string;
    cellClassName?: string;
};

type DataTableProps<T> = {
    data: T[];
    columns: ColumnDef<T>[];
    keyExtractor: (row: T) => string | number;
};


export function DataTable<T>({ data, columns, keyExtractor }: DataTableProps<T>) {
    return (
        <Card className="overflow-hidden rounded-[24px] border border-[#D8E0ED] p-0 shadow-none">
            <Table>
                <TableHeader className="bg-[#F8FAFC]">
                    <TableRow className="border-[#D8E0ED] hover:bg-transparent">
                        {columns.map((col, index) => (
                            <TableHead
                                key={index}
                                className={`h-[50px] px-3 text-start text-[11px] font-medium uppercase tracking-[0.08em] text-[#63738F] ${col.headerClassName || ""}`}
                            >
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={keyExtractor(row)}
                            className="border-[#D8E0ED] hover:bg-transparent"
                        >
                            {columns.map((col, index) => (
                                <TableCell
                                    key={index}
                                    className={`px-3 py-5 text-[13px] text-[#0F172A] ${col.cellClassName || ""}`}
                                >
                                    {col.cell(row)}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}