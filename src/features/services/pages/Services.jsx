import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../components/ui/table'

import { Button } from '../../../components/ui/button'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../../../components/ui/dialog'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../../../components/ui/alert-dialog'

const Services = () => {
  const [open, setOpen] = useState(false)

  const [services, setServices] = useState(() =>
    JSON.parse(localStorage.getItem('services')) || []
  )

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services))
  }, [services])

  const saveService = () => {
    if (!title || !description) return

    if (editingId) {
      setServices(
        services.map(service =>
          service.id === editingId
            ? {
              ...service,
              title,
              description
            }
            : service
        )
      )
    } else {
      setServices([
        ...services,  
        {
          id: Date.now(),
          title,
          description,
          createdAt: new Date().toISOString()
        }
      ])
    }

    setTitle('')
    setDescription('')
    setEditingId(null)
    setOpen(false)
  }

  const editService = (service) => {
    setEditingId(service.id)
    setTitle(service.title)
    setDescription(service.description)
    setOpen(true)
  }

  const deleteService = () => {
    setServices(
      services.filter(service =>
        service.id !== deleteId
      )
    )

    setDeleteId(null)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-purple-900">
            Services
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your services
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>

          <DialogTrigger className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            Add Service
          </DialogTrigger>

          <DialogContent className="rounded-2xl">

            <DialogHeader>
              <DialogTitle className="text-xl text-purple-800">
                {editingId ? 'Edit Service' : 'Add Service'}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4">

              <input
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="rounded-xl border border-purple-200 p-3 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />

              <input
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="rounded-xl border border-purple-200 p-3 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />

              <Button
                onClick={saveService}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:opacity-90"
              >
                Save
              </Button>

            </div>

          </DialogContent>
        </Dialog>

      </div>

      <div className="rounded-2xl bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.07)]">

        <div className="w-full overflow-x-auto">

          <Table>

            <TableHeader>
              <TableRow className="border-purple-100">

                <TableHead className="font-bold text-purple-800">
                  Title
                </TableHead>

                <TableHead className="font-bold text-purple-800">
                  Description
                </TableHead>

                <TableHead className="font-bold text-purple-800">
                  Actions
                </TableHead>

              </TableRow>
            </TableHeader>

            <TableBody>

              {services.map(service => (

                <TableRow
                  key={service.id}
                  className="border-purple-100 transition-colors hover:bg-purple-50/50"
                >

                  <TableCell className="font-medium">
                    {service.title}
                  </TableCell>

                  <TableCell>
                    {service.description}
                  </TableCell>

                  <TableCell>

                    <div className="flex flex-wrap gap-2">

                      <Button
                        onClick={() => editService(service)}
                        className="rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={() => setDeleteId(service.id)}
                        className="rounded-lg bg-pink-500 text-white hover:bg-pink-600"
                      >
                        Delete
                      </Button>

                    </div>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </div>

      </div>

      <AlertDialog
        open={deleteId !== null}
        onOpenChange={open =>
          !open && setDeleteId(null)
        }
      >

        <AlertDialogContent className="rounded-2xl">

          <AlertDialogHeader>

            <AlertDialogTitle className="text-purple-900">
              Delete Service?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete this service?
            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel className="rounded-xl">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={deleteService}
              className="rounded-xl bg-pink-500 hover:bg-pink-600"
            >
              Delete
            </AlertDialogAction>

          </AlertDialogFooter>

        </AlertDialogContent>

      </AlertDialog>

    </div>
  )
}

export default Services