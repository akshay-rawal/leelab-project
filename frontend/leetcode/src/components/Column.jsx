import {createColumnHelper} from "@tanstack/react-table"


const columnHelper = createColumnHelper()

export const Column = [
    columnHelper.accessor("id",{
        header:"ID",
        cell:info => info.getValue(),
    }),
      columnHelper.accessor("name", {
    header: "Name",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: "Role",
    cell: info => info.getValue(),
  }),
]