"use client"

import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import useRefetch from '~/hooks/use-refetch'
import { api } from '~/trpc/react'

type FormInput = {
    repoUrl: string
    projectName: string
    githubToken?: string
}

const CreatePage = () => {
    const { register, handleSubmit, reset } = useForm<FormInput>()
    const createProject = api.project.createProject.useMutation()
    const refetch = useRefetch()

    function onSubmit(data: FormInput) {
        
        createProject.mutate({
            githubUrl: data.repoUrl,
            name:data.projectName,
            githubToken: data.githubToken
        },{
            onSuccess: ()=>{
                toast.success('Project created Successfully')
                refetch()
                reset()
            },
            onError: ()=>{
                toast.error('Failed to create a project')
            }
        })
        return true;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
                {/* Illustration */}
                <div className="hidden md:block">
                    <img 
                        src='/undraw.svg' 
                        alt="GitHub integration" 
                        className="w-full h-auto max-w-md mx-auto"
                    />
                </div>

                {/* Form Section */}
                <div className="bg-gray-800 rounded-xl p-6 shadow-2xl border border-gray-700">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
                            Link Your GitHub Repository
                        </h1>
                        <p className="text-gray-400">
                            Enter the URL of your repository to link to gitEase
                        </p>
                    </div>

                    <div className="space-y-4">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <Input 
                                {...register('projectName', { required: true })}
                                placeholder="Project Name"
                                required
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Input 
                                {...register('repoUrl', { required: true })}
                                placeholder="GitHub URL"
                                type="url"
                                required
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Input 
                                {...register('githubToken')}
                                placeholder="GitHub Token (optional)"
                                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <Button 
                                disabled={createProject.isPending}
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 cursor-pointer"
                            >
                                Create Project
                            </Button>
                        </form>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
                        <p className="text-sm text-gray-300">
                            <strong>Note:</strong> GitHub token is optional but required for private repositories. 
                            Your token is encrypted and stored securely.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage