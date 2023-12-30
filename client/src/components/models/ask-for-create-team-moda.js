import React, { useState } from 'react'
import CreateTeamModal from './create-team-modal'

const AskForCreateTeamModal = () => {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="flex flex-col h-3/5 justify-center items-center">
                <p className=' text-2xl font-bold'>You don't have Team yet</p>
                <div className="flex flex-col items-center">
                    <p className="text-xl font-semibold my-1">Create one?</p>
                    <button onClick={() => setOpen(true)}>
                        <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-9 h-9 text-teal-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>

                </div>
            </div>

            <CreateTeamModal 
             openModal ={open}
             setOpenModal ={setOpen}
             setOpenSnackbar ={() => {}}
             setSnackbarMsg ={''}

            />
        </>
    )
}

export default AskForCreateTeamModal