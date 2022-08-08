import * as Yup from 'yup' 

const catSchema = Yup.object().shape({
    Name: Yup.string().max(50, 'Max 50 Characters').required(),
    Description: Yup.string().max(100, 'Max 100 Characters')
})

//From Resources -- Will need to create the validation for ToDos
// const resourceSchema = Yup.object().shape({
//     Name: Yup.string().max(25, 'Max 25 Characters').required(),
//     Description: Yup.string().max(50, 'Max 50 Characters'),
//     Url: Yup.string().max(75, 'Max 75 Characters').required(),
//     LinkText: Yup.string().max(25, 'Max 25 Characters').required(),
//     CategoryId: Yup.number().required()
// })

const toDoSchema = Yup.object().shape({
    Name: Yup.string().max(25, 'Max 25 Characters').required(),
    Description: Yup.string().required(),
    Status: Yup.bool().required(),
    CategoryId: Yup.number()


})

// export { resourceSchema, catSchema }
export default catSchema //-- Default says export this first. 
export { toDoSchema } // --Uncomment and add in the toDoSchema here //COMPLETE