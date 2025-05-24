"use client";
import { JSX, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "@/lib";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Textarea,
} from "@/components/ui";
import {
  ArrowUpRight,
  Loader2,
  MessageCircle,
  Share2,
  ThumbsUp,
} from "lucide-react";
import { toast } from "sonner";

type AddPostProps = {
  page_id: number;
  avatar: string | undefined;
  name: string | undefined;
};

export const AddPost = ({
  page_id,
  name,
  avatar,
}: AddPostProps): JSX.Element => {
  const [postMessage, setPostMessage] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const query_client = useQueryClient();

  const { mutate: publish, isPending } = useMutation({
    mutationKey: ["add_post"],
    mutationFn: async ({ data }: { data: any }) => {
      return post(`/facebook/${page_id}/post`, { ...data })
        ?.then((res) => {
          if (res) {
            setPostMessage("");
            toast.success(`Objava uspešno postavljena!`, {
              richColors: true,
            });
            query_client.invalidateQueries({
              queryKey: [`posts_facebook_list`, page_id],
            });
          }
        })
        ?.catch((err) => console.error(err));
    },
  });

  return (
    <div className={`mt-5 w-full pb-5 px-5`}>
      <Textarea
        onChange={(e) => setPostMessage(e.target.value)}
        value={postMessage}
        rows={10}
        disabled={isPending}
        className={`w-full min-h-32 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-3 focus-visible:ring-offset-white`}
        placeholder={`Unesite tekst objave`}
      />
      <Button
        onClick={() => setDialogOpen(true)}
        disabled={isPending || !postMessage.trim()}
        className={`h-[3rem] w-full disabled:opacity-50 disabled:cursor-not-allowed mt-5 bg-primary text-primary-foreground flex items-center justify-center gap-2`}
      >
        Objavite
        {isPending ? <Loader2 className={`animate-spin`} /> : <ArrowUpRight />}
      </Button>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className={`max-md:!max-w-[95%] mx-auto !max-w-md w-full`}
        >
          <DialogHeader>
            <DialogTitle className={`text-xl leading-tight`}>
              Preview objave
            </DialogTitle>
            <DialogDescription>
              Da li ste sigurni da želite da objavite ovaj post?
            </DialogDescription>
          </DialogHeader>
          <Card className={`shadow-none rounded-sm`}>
            {/* Header */}
            <CardHeader className={`flex items-center space-x-3`}>
              <Avatar>
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
              <div className={`flex flex-col`}>
                <span className={`font-semibold text-gray-900`}>{name}</span>
                <span
                  className={`flex items-center text-gray-500 text-sm space-x-1`}
                >
                  <span>Just Now</span>
                </span>
              </div>
            </CardHeader>
            <CardContent
              className={`text-gray-700 text-base whitespace-pre-wrap`}
            >
              {postMessage || "Unesite tekst objave..."}
            </CardContent>
            <CardFooter
              className={`flex justify-around border-t pt-2 text-gray-600`}
            >
              <button className={`flex items-center space-x-1`}>
                <ThumbsUp size={16} />
                <span>Like</span>
              </button>
              <button className={`flex items-center space-x-1`}>
                <MessageCircle size={16} />
                <span>Comment</span>
              </button>
              <button className={`flex items-center space-x-1`}>
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </CardFooter>
          </Card>
          <div className={`inline-flex items-center space-x-2 ml-auto`}>
            <Button
              variant={`ghost`}
              className={`font-normal`}
              onClick={() => setDialogOpen(false)}
            >
              Ne, imam izmene
            </Button>
            <Button
              variant={`secondary`}
              className={`text-white font-normal`}
              onClick={() => {
                setDialogOpen(false);
                publish({ data: { message: postMessage } });
              }}
            >
              Objavite
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
