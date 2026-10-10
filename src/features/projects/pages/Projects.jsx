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

const Projects = () => {
  const [open, setOpen] = useState(false)

  const [projects, setProjects] = useState(() =>
    JSON.parse(localStorage.getItem('projects')) || []
  )

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects])

  const handleImage = (e) => {
    const file = e.target.files[0]

    if (!file) return

    const reader = new FileReader()

    reader.onloadend = () => {
      setImageUrl(reader.result)
    }

    reader.readAsDataURL(file)
  }

  const saveProject = () => {
    if (!title || !description || !imageUrl) return

    if (editingId) {
      setProjects(
        projects.map(project =>
          project.id === editingId
            ? {
                ...project,
                title,
                description,
                imageUrl
              }
            : project
        )
      )
    } else {
      setProjects([
        ...projects,
        {
          id: Date.now(),
          title,
          description,
          imageUrl,
          createdAt: new Date().toISOString()
        }
      ])
    }

    setTitle('')
    setDescription('')
    setImageUrl('')
    setEditingId(null)
    setOpen(false)
  }

  const editProject = (project) => {
    setEditingId(project.id)
    setTitle(project.title)
    setDescription(project.description)
    setImageUrl(project.imageUrl)
    setOpen(true)
  }

  const deleteProject = () => {
    setProjects(
      projects.filter(project =>
        project.id !== deleteId
      )
    )

    setDeleteId(null)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-purple-900">
            Projects
          </h1>

          <p className="mt-1 text-gray-500">
            Manage your projects
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>

          <DialogTrigger className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 font-medium text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
            Add Project
          </DialogTrigger>

          <DialogContent className="rounded-2xl">

            <DialogHeader>
              <DialogTitle className="text-xl text-purple-800">
                {editingId ? 'Edit Project' : 'Add Project'}
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

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="rounded-xl border border-purple-200 p-3 text-sm"
              />

              <input
                type="text"
                placeholder="Or enter image URL"
                value={
                  imageUrl.startsWith('data:')
                    ? ''
                    : imageUrl
                }
                onChange={e => setImageUrl(e.target.value)}
                className="rounded-xl border border-purple-200 p-3 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />

              {imageUrl && (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="h-[120px] w-[180px] rounded-xl object-cover shadow-md"
                />
              )}

              <Button
                onClick={saveProject}
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
                  Image
                </TableHead>

                <TableHead className="font-bold text-purple-800">
                  Actions
                </TableHead>

              </TableRow>
            </TableHeader>

            <TableBody>

              {projects.map(project => (

                <TableRow
                  key={project.id}
                  className="border-purple-100 transition-colors hover:bg-purple-50/50"
                >

                  <TableCell className="font-medium">
                    {project.title}
                  </TableCell>

                  <TableCell>
                    {project.description}
                  </TableCell>

                  <TableCell>

                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-[70px] w-[100px] rounded-xl object-cover shadow-sm"
                    />

                  </TableCell>

                  <TableCell>

                    <div className="flex flex-wrap gap-2">

                      <Button
                        onClick={() => editProject(project)}
                        className="rounded-lg bg-purple-600 text-white hover:bg-purple-700"
                      >
                        Edit
                      </Button>

                      <Button
                        onClick={() => setDeleteId(project.id)}
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
              Delete Project?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete this project?
            </AlertDialogDescription>

          </AlertDialogHeader>

          <AlertDialogFooter>

            <AlertDialogCancel className="rounded-xl">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={deleteProject}
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

export default Projects