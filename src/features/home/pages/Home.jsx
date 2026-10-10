import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '../../../components/ui/card'

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from '../../../components/ui/chart'

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../../../components/ui/select'

const Home = () => {
  const [services, setServices] = useState([])
  const [projects, setProjects] = useState([])
  const [selectedData, setSelectedData] = useState('services')

  const loadData = () => {
    const savedServices = localStorage.getItem('services')
    const savedProjects = localStorage.getItem('projects')

    setServices(savedServices ? JSON.parse(savedServices) : [])
    setProjects(savedProjects ? JSON.parse(savedProjects) : [])
  }

  useEffect(() => {
    loadData()

    window.addEventListener('storage', loadData)

    return () => {
      window.removeEventListener('storage', loadData)
    }
  }, [])

  const servicesCount = services.length
  const projectsCount = projects.length

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const currentYear = new Date().getFullYear()

  const chartData = months.map((month, index) => {
    const servicesInMonth = services.filter(service => {
      if (!service.createdAt) return false

      const date = new Date(service.createdAt)

      return (
        date.getFullYear() === currentYear &&
        date.getMonth() === index
      )
    }).length

    const projectsInMonth = projects.filter(project => {
      if (!project.createdAt) return false

      const date = new Date(project.createdAt)

      return (
        date.getFullYear() === currentYear &&
        date.getMonth() === index
      )
    }).length

    return {
      month,
      services: servicesInMonth,
      projects: projectsInMonth
    }
  })

  const chartConfig = {
    services: {
      label: 'Services',
      color: '#9333ea'
    },
    projects: {
      label: 'Projects',
      color: '#ec4899'
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-900 sm:text-4xl">
          Welcome to Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Here is a summary of your dashboard.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <Card className="rounded-2xl border-none shadow-[0_4px_20px_rgba(147,51,234,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(147,51,234,0.18)]">
          <CardHeader>
            <CardTitle className="text-purple-800">
              Total Services
            </CardTitle>

            <CardDescription>
              Number of available services
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold text-purple-600">
              {servicesCount}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-none shadow-[0_4px_20px_rgba(236,72,153,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(236,72,153,0.18)]">
          <CardHeader>
            <CardTitle className="text-pink-600">
              Total Projects
            </CardTitle>

            <CardDescription>
              Number of available projects
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-4xl font-bold text-pink-500">
              {projectsCount}
            </p>
          </CardContent>
        </Card>

      </div>

      {/* Chart */}
      <Card className="mt-8 rounded-2xl border-none shadow-[0_4px_20px_rgba(0,0,0,0.08)]">

        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <CardTitle className="text-xl text-purple-900">
              Services & Projects
            </CardTitle>

            <CardDescription>
              Monthly data for {currentYear}
            </CardDescription>
          </div>

          <Select
            value={selectedData}
            onValueChange={setSelectedData}
          >
            <SelectTrigger className="w-[180px] rounded-xl border-purple-200 focus:ring-purple-400">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="services">
                Services
              </SelectItem>

              <SelectItem value="projects">
                Projects
              </SelectItem>
            </SelectContent>
          </Select>

        </CardHeader>

        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="h-[250px] w-full"
          >
            <AreaChart
              data={chartData}
              margin={{
                left: 0,
                right: 10,
                top: 10,
                bottom: 0
              }}
            >

              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                width={30}
              />

              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent indicator="dot" />
                }
              />

              <Area
                type="monotone"
                dataKey={selectedData}
                stroke={`var(--color-${selectedData})`}
                fill="none"
                strokeWidth={3}
                dot={{
                  r: 4
                }}
                activeDot={{
                  r: 6
                }}
              />

              <ChartLegend
                content={<ChartLegendContent />}
              />

            </AreaChart>
          </ChartContainer>
        </CardContent>

      </Card>

    </div>
  )
}

export default Home