/** @format */
import {create} from "zustand"
import {immer} from "zustand/middleware/immer"
import {v4 as uuidv4} from "uuid"
import {Item} from "@radix-ui/react-select"

//its selected rows

export const tableStore = create(
  immer((set, get) => ({
    columns: [],
    rows: [],
    name: "",
    path: "",
    setCols: (newCols) =>
      set((state) => {
        state.columns = newCols
      }),
    setRows: (newData) =>
      set((state) => {
        state.rows = newData
      }),
    setPath: (path) =>
      set((state) => {
        state.path = path
      }),
    setName: (name) =>
      set((state) => {
        state.name = name
      }),
    addCol: (colName, dataType) =>
      set((state) => {
        console.log(`trying to create ${colName} of type ${dataType}`)
        // state.rows.map(
        //   (item) => (item[colName] = dataType === "string" ? "/" : 0)
        // )
        if (dataType === "text") {
          state.rows.map((item) => (item[colName] = "/"))
        }
        if (dataType === "string") {
          state.rows.map((item) => (item[colName] = "/"))
        }
        if (dataType === "number") {
          state.rows.map((item) => (item[colName] = 0))
        }
        if (dataType === "date") {
          const date = new Date()
          let month = date.getMonth()
          if (month.toString().length === 1) {
            month = "0" + month
          }
          const str = `${date.getFullYear()}-${month}-${date.getDate()}`

          state.rows.map((item) => (item[colName] = str))
        }
        if (dataType === "checkbox") {
          state.rows.map((item) => (item[colName] = false))
        }
        if (dataType === "url") {
          state.rows.map((item) => (item[colName] = ""))
        }
        state.columns.push({
          name: colName,
          type: dataType,
        })
      }),

    addRow: () =>
      set((state) => {
        let emptyRow = {}
        const id = uuidv4()
        const cols = get().columns
        //add id
        for (let i = 0; i < cols.length; i++) {
          const type = cols[i].type
          if (type === "text") {
            emptyRow = {...emptyRow, [cols[i].name]: ""}
          }
          if (type === "string") {
            emptyRow = {...emptyRow, [cols[i].name]: ""}
          }
          if (type === "number") {
            emptyRow = {...emptyRow, [cols[i].name]: 0}
          }
          if (type === "checkbox") {
            emptyRow = {...emptyRow, [cols[i].name]: false}
          }
          if (type === "date") {
            const date = new Date()
            let month = date.getMonth()
            if (month.toString().length === 1) {
              month = "0" + month
            }
            const str = `${date.getFullYear()}-${month}-${date.getDate()}`
            emptyRow = {...emptyRow, [cols[i].name]: str}
          }
          if (type === "url") {
            emptyRow = {...emptyRow, [cols[i].name]: ""}
          }
        }
        //define for other type of data
        emptyRow = {id: id, ...emptyRow}

        state.rows.push(emptyRow)
      }),
    setCell: (index, col, data, type) => {
      set((state) => {
        if (type === "number") {
          state.rows[index][col] = Number(data)
        } else {
          state.rows[index][col] = data
        }
      })
    },

    saveData: async () => {
      const cols = get().columns
      const rows = get().rows
      const path = get().path

      const data = JSON.stringify({
        columns: cols,
        rows: rows,
        path: path,
      })

      fetch(`/donnee/${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then(async (res) => {
          const json = await res.json()
          return true
        })
        .catch((err) => {
          console.log(err)
          return false
        })
    },
    getState: () => {
      const cols = tableStore.getState().columns
      const rows = tableStore.getState().rows
      console.log(cols)
      console.log(rows)
    },
    selectMode: false,
    selectedRows: [],
    setSelectMode: () => {
      set((state) => {
        state.selectMode = !state.selectMode
      })
    },
    selectRow: (item) => {
      set((state) => {
        const index = state.selectedRows.findIndex((row) => row.id === item.id)
        if (index === -1) {
          state.selectedRows.push(item)
        } else {
          state.selectedRows.splice(index, 1)
        }
      })
    },
    selectAllRows: () => {
      set((state) => {
        if (state.selectedRows.length === state.rows.length) {
          state.selectedRows = []
        } else {
          state.rows.map((row) => {
            const index = state.selectedRows.findIndex(
              (selectedRow) => selectedRow.id === row.id
            )
            index === -1 && state.selectedRows.push(row)
          })
        }
      })
    },
    deleteSelectedRows: () => {
      set((state) => {
        state.selectedRows.map((selectedRow) => {
          const index = state.rows.findIndex((row) => row.id === selectedRow.id)
          state.rows.splice(index, 1)
        })
        state.selectedRows = []
        state.selectMode = false
      })
    },
  }))
)
