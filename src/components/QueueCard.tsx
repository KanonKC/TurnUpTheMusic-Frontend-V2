import React from "react";
import { Card } from "./ui/card";
import { Trash, X } from "lucide-react";
import { QueueVideoMetadata, QueueVideoMetadataDummy } from "@/types/apis/Queue.api";
import { formatTime } from "@/services/FormatTime.service";
import { PlaylistService } from "@/services/apis/Playlist.service";
import { cn } from "@/lib/utils";
import { CardVariant } from "@/types/CardVariant";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { QueueService } from "@/services/apis/Queue.service";
import socket from "@/socket";

const QueueCard = ({
	variant = "MID",
	queueVideoMetadata = QueueVideoMetadataDummy,
	active = false,
	onClick=()=>{},
	readOnly = false
}: {
	variant?: CardVariant;
	queueVideoMetadata?: QueueVideoMetadata
	active?: boolean;
	onClick?: () => void
	readOnly?: boolean
}) => {

	const cardCustomCSS = () => {
		let css = ""

		if (active) {
			css = "bg-[#4d4d4d] "
		}

		if (variant === "TOP") {
			return css + "rounded-t-lg ";
		} else if (variant === "MID") {
			return css + "";
		} else if (variant === "BOTTOM") {
			return css + "rounded-b-lg ";
		}
		else if (variant === "ROUND") {
			return css + "rounded-lg ";
		}
	};

	const imgCustomCSS = () => {
		if (variant === "TOP") {
			return "rounded-tl-lg ";
		} else if (variant === "MID") {
			return "";
		} else if (variant === "BOTTOM") {
			return "rounded-bl-lg ";
		}
		else if (variant === "ROUND") {
			return "rounded-l-lg ";
		}
	};

	const handleRemoveMusic = () => {
		QueueService.remove(queueVideoMetadata.id).then(() => {
			socket.emit("reloadQueuesInPlaylist", queueVideoMetadata.playlist_id);
		})
	}

	return (
		<Card
			className={cn(cardCustomCSS(),"w-[700px]",{
				"cursor-pointer": !readOnly
			})}
		>
			<div className="flex">
				<div className="w-1/5" onClick={onClick}>
					<img
						className={imgCustomCSS()}
						src={queueVideoMetadata.video.thumbnail}
					/>
				</div>
				<div className="w-4/5 mx-2 flex justify-between items-center">
					<div className="mr-5 ml-1 w-5/6" onClick={onClick}>
						<div className="text-md">{queueVideoMetadata.video.title}</div>
						<div className="text-sm text-gray-400">{queueVideoMetadata.video.channel_title}</div>
					</div>
					<div className="flex items-center gap-3 mr-3">
						<div className="text-md">{formatTime(queueVideoMetadata.video.duration)}</div>
						{!readOnly && 
							<Dialog>
								<DialogTrigger>
									<Trash className="cursor-pointer hover:text-red-500" size={20}/>
								</DialogTrigger>
								<DialogContent>
									<DialogTitle>Remove Video Confirmation</DialogTitle>
									<DialogDescription>
										<p>Are you sure you want to remove this video from the queue?</p>
										<b>This cannot be undone.</b>
									</DialogDescription>
									<DialogFooter>
										<div className="flex justify-end mt-4">
											<Button onClick={handleRemoveMusic} className="text-white bg-red-600 hover:bg-red-700">Delete</Button>
										</div>
									</DialogFooter>
								</DialogContent>
							</Dialog>
						}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default QueueCard;
