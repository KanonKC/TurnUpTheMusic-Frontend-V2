import { CardVariant } from "@/types/CardVariant";
import { YoutubeBaseAttributes } from "@/types/apis/YoutubeSearch.api";
import AddQueueCard from "./AddQueueCard";
import QueueCard from "./QueueCard";
import { ScrollArea } from "./ui/scroll-area";

const AddQueueCardGroup = ({
	searchVideos=[],
	// readOnly = false,
}: {
	searchVideos?: YoutubeBaseAttributes[];
	// readOnly?: boolean;
}) => {

	// const handleOnClick = async (index:number) => {

	// 	// await PlaylistService.play.index(nowPlaying.id, index)
	// 	// socket.emit("reloadQueuesInPlaylist",nowPlaying.id)
	// }

	return (
		<ScrollArea className="h-[50vh] pr-5">
			{searchVideos.length === 0 ? (
				<div className="invisible">
					<QueueCard />
				</div>
			) : (
				searchVideos.map((queueData, i) => {
					let variant: CardVariant = "MID";

					if (searchVideos.length === 1) variant = "ROUND";
					else if (i === 0) variant = "TOP";
					else if (i === searchVideos.length - 1) variant = "BOTTOM";

					return (
						<AddQueueCard
							key={i}
							videoMetadata={queueData}
							variant={variant}
						/>
					);
				})
			)}
			<div className="pt-1"></div>
		</ScrollArea>
	);
};

export default AddQueueCardGroup;
