import os
import subprocess
from celery import shared_task


@shared_task
def process_audio_to_hls(audio_file_path, working_directory):
    print("hls proccess called")
    try:
        # convert audio to AAC format
        aac_output_file = os.path.join(working_directory, "output.aac")
        command1 = [
            "ffmpeg",
            "-i",
            audio_file_path,
            "-c:a",
            "aac",
            "-strict",
            "experimental",
            "-b:a",
            "192k",
            aac_output_file,
        ]
        subprocess.run(command1, check=True)
        print(f"audio proccess {working_directory} : acc created.")
        # create HLS segments
        playlist_path = os.path.join(working_directory, "playlist.m3u8")
        command2 = [
            "ffmpeg",
            "-i",
            aac_output_file,
            "-map",
            "0",
            "-codec:v",
            "libx264",
            "-codec:a",
            "aac",
            "-f",
            "ssegment",
            "-segment_list",
            playlist_path,
            "-segment_list_flags",
            "+live",
            "-segment_time",
            "2",
            os.path.join(working_directory, "out%03d.ts"),
        ]
        subprocess.run(command2, check=True)
        print(f"audio proccess {working_directory} : hls created.")
        # clean up temporary files
        os.remove(audio_file_path)
        os.remove(aac_output_file)

        return True
    except Exception as e:
        return str(e)
