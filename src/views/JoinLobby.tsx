import TitleHeader from '@/components/TitleHeader'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import CenterContainer from '@/layouts/CenterContainer'
import { PlaylistService } from '@/services/apis/Playlist.service'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const JoinLobby = () => {

    const [roomCode,setRoomCode] = useState("")
    const navigate = useNavigate()

    const handleChange = (e:string) => {
        setRoomCode(e)
    }

    const resolveRoomCode = async () => {
        // console.log(roomCode)
        PlaylistService.get(roomCode).then((response) => {
            navigate(`/${roomCode}`)
        }).catch((err) => {
            
        })
    }

    useEffect(() => {
        if (roomCode.length === 6) {
            resolveRoomCode()
        }
    },[roomCode])

  return (
    <CenterContainer>

        <div className=''>
           <div>
                <InputOTP onChange={(e) => handleChange(e)} value={roomCode} maxLength={6}>
                    <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
           </div>

           <div className='flex justify-center mt-5'>
                <Button disabled={roomCode.length !== 6} onClick={resolveRoomCode}>Join Lobby</Button>
           </div>
        </div>
    </CenterContainer>
  )
}

export default JoinLobby