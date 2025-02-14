import { createContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation } from "wouter";
import { createRpt, createUs, deleteReport, deleteUser, editeUs, reportesAll, reportesOne, reportesUser, updateReport, updateReportResident, usersAll } from "../services/servicesAll";

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {
    const [location, setLocation] = useLocation()
    const [userAll, setUserAll] = useState([])
    const [adminAll, setAdminAll] = useState([])
    const [reportAll, setReportAll] = useState([])
    const [reportFrUs, setReportFrUs] = useState([])
    const [reportFOne, setReportFOne] = useState([])
    const queryClient = useQueryClient();

    const { data: users } = useQuery({
        queryKey: ['users'],
        queryFn: usersAll,
    })

    useEffect(() => {
        if (users) {
            setUserAll(users)
            const adm = users.filter((us) => us.rol === 'administrador')
            setAdminAll(adm)
        }
    }, [users])

    const { data: reports } = useQuery({
        queryKey: ['reports'],
        queryFn: reportesAll,
    })

    useEffect(() => {
        if (reports) {
            setReportAll(reports)
        }
    }, [reports])

    const { data: reportUs } = useQuery({
        queryKey: ['reportUs'],
        queryFn: reportesUser,
        enabled: location === '/dashboard/incident'
    })

    useEffect(() => {
        if (reportUs) {
            setReportFrUs(reportUs)
        }
    }, [reportUs])

    const { data: reportOne } = useQuery({
        queryKey: ['reportOne'],
        queryFn: reportesOne,
        enabled: location === '/dashboard/edit'
    })

    useEffect(() => {
        if (reportOne) {
            setReportFOne(reportOne)
        }
    }, [reportOne])

    const createReport = useMutation({
        mutationKey: ['createReport'],
        mutationFn: createRpt,
        onSuccess: (data) => {
            setLocation('/dashboard/incident')

        },
        onError: (err) => {
        }
    })

    const updateStatus = useMutation({
        mutationKey: ['updateStatus'],
        mutationFn: updateReport,
        onSuccess: (data) => {
            queryClient.invalidateQueries('reports')
        },
        onError: (err) => {
        }
    })

    const updateReportUs = useMutation({
        mutationKey: ['updateReport'],
        mutationFn: updateReportResident,
        onSuccess: (data) => {
            queryClient.invalidateQueries('reportUs')
            setLocation('/dashboard/incident')

        },
        onError: (err) => {
        }
    })

    const delReport = useMutation({
        mutationKey: ['delReport'],
        mutationFn: deleteReport,
        onSuccess: (data) => {
            queryClient.invalidateQueries('reports')
            queryClient.invalidateQueries('reportUs')
        },
        onError: (err) => {
        }
    })


    const createUser = useMutation({
        mutationKey: ['createUser'],
        mutationFn: createUs,
        onSuccess: (data) => {
            queryClient.invalidateQueries('users')
            setLocation('/dashboard/users')

        },
        onError: (err) => {
        }
    })

    const updatUser = useMutation({
        mutationKey: ['updatUser'],
        mutationFn: editeUs,
        onSuccess: (data) => {

            queryClient.invalidateQueries('users')
            setLocation('/dashboard')

        },
        onError: (err) => {
        }
    })

    const delUser = useMutation({
        mutationKey: ['delUser'],
        mutationFn: deleteUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries('users')
        },
        onError: (err) => {
        }
    })

    return (
        <AdminContext.Provider value={{
            adminAll,
            createReport,
            delReport,
            createUser,
            reportFrUs,
            userAll,
            reportAll,
            reportFOne,
            updateStatus,
            delUser,
            updateReportUs,
            updatUser
        }}>
            {children}
        </AdminContext.Provider>
    )
}

