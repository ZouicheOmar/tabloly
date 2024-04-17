/** @format */

import {create} from "zustand"
import {immer} from "zustand/middleware/immer"

export const listStore = create(
  immer((set, get) => ({
    list: [],
    selected: [],
    selectMode: false,
    setList: (newList) => {
      set((state) => {
        state.list = newList
      })
    },
    setSelected: (item) => {
      set((state) => {
        const index = state.selected.findIndex(
          (file) => file.path === item.path
        )
        if (index === -1) {
          state.selected.push(item)
        } else {
          state.selected.splice(index, 1)
        }
      })
    },
    selectAll: () => {
      set((state) => {
        if (state.selected.length === state.list.length) {
          state.selected = []
        } else {
          state.list.map((item, index) => {
            state.selected.push(item)
          })
        }
      })
    },
    setSelectMode: () => {
      set((state) => {
        if (state.selectMode) {
          state.selectMode = false
          state.selected = []
        } else {
          state.selectMode = true
        }
      })
    },
    deleteSelected: () => {
      const selected = get().selected
      const data = {files: selected}
      fetch(`/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          const json = await res.json()
          set((state) => {
            selected.map((item) => {
              const index = state.list.findIndex(
                (file) => file.path === item.path
              )
              state.list.splice(index, 1)
            })
            state.selected = []
            state.selectMode = false
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
  }))
)
