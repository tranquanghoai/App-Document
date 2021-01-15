import AdminService from './AdminService'
import EmployeeService from './EmployeeService'

const requestMap = {
    employee: EmployeeService,
    admin: AdminService
}

export default class FactoryService {
    static request(classname, auth = 'employee') {
        let RequestClass = requestMap[auth][classname]

        if (!RequestClass) {
            throw new Error('Invalid request class name: ' + classname)
        }

        return new RequestClass()
    }
}