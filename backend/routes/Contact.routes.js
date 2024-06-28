import {Router} from 'express'
import { addContact, getContacts,getContact,updateContact,deleteContact } from '../controllers/Contact.controllers.js'
import { jwtAuthMiddleware } from '../middleware/Auth.middleware.js'

const router = Router()

router.post('/add-contact',jwtAuthMiddleware,addContact)

router.get('/contacts',jwtAuthMiddleware,getContacts)

router.get('/contact/:id',jwtAuthMiddleware,getContact)

router.put('/update-contact/:id',jwtAuthMiddleware,updateContact)

router.delete('/contact/:id',jwtAuthMiddleware,deleteContact)

export default router