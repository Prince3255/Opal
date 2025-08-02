import FormGenerator from '@/components/global/form-generator'
import Loader from '@/components/global/loader'
import { Button } from '@/components/ui/button'
import { useCreateWorkspace } from '@/hooks/useCreateWorkspace'
import React from 'react'

type Props = {}

const WorkspaceForm = (props: Props) => {
  const {errors, isPending, onFormSubmit, register} = useCreateWorkspace()
  
  return (
    <form onSubmit={(e) => {
      onFormSubmit(e)
    }} className='flex flex-col gap-y-3'>
        <FormGenerator 
          errors={errors} 
          register={register} 
          name='name' 
          label='Name' 
          inputType='input' 
          type='text' 
          placeholder='Workspace Name'
        />
        <Button type='submit' disabled={isPending} className='text-sm w-full mt-2'>
            <Loader state={isPending}>Create Workspace</Loader>
        </Button>
    </form>
  )
}

export default WorkspaceForm