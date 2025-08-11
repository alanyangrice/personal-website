from PIL import Image
import os

def extract_frames_from_local_gif(gif_path, output_folder, step=5):
    """
    Opens a local GIF file and extracts every Nth frame.

    Args:
        gif_path (str): The full path to the local GIF file.
        output_folder (str): The folder where extracted frames will be saved.
        step (int): The interval for extracting frames (e.g., 5 for every 5th frame).
    """
    
    # --- 1. Check if the GIF file exists ---
    if not os.path.exists(gif_path):
        print(f"Error: The file '{gif_path}' was not found.")
        return

    # --- 2. Create the output directory if it doesn't exist ---
    if not os.path.exists(output_folder):
        print(f"Creating directory: {output_folder}")
        os.makedirs(output_folder)

    # --- 3. Open the GIF and process its frames ---
    try:
        # Use a 'with' statement to ensure the file is properly closed
        with Image.open(gif_path) as img:
            print(f"Processing GIF: {gif_path}")
            print(f"Extracting every {step}th frame...")
            
            saved_count = 0
            
            # Iterate through each frame in the GIF
            # The 'img.n_frames' attribute gives the total number of frames
            for frame_number in range(img.n_frames):
                # Check if this frame is one we want to extract
                # We use the modulo operator (%). 'frame_number % step == 0'
                # will be true for frame 0, 5, 10, etc. (the 1st, 6th, 11th...)
                if frame_number % step == 0:
                    # To work with a specific frame, you must 'seek' to it
                    img.seek(frame_number)
                    
                    # Construct a clear filename. The ':04d' formats the number with leading zeros (e.g., 0001, 0006)
                    output_path = os.path.join(output_folder, f"frame_{frame_number + 1:04d}.png")
                    
                    # Save the current frame as a PNG file for high quality
                    img.save(output_path, 'PNG')
                    
                    print(f"  - Saved frame {frame_number + 1}")
                    saved_count += 1
            
            print(f"\nExtraction complete. Saved {saved_count} frames to the '{output_folder}' folder.")

    except Exception as e:
        print(f"An error occurred during image processing: {e}")


# --- HOW TO USE THE SCRIPT ---
if __name__ == "__main__":
    # 1. IMPORTANT: Replace this with the actual path to YOUR GIF file.
    #    - On Windows, it might look like: "C:\\Users\\YourUser\\Downloads\\my_gif.gif"
    #    - On macOS or Linux, it might look like: "/Users/YourUser/Downloads/my_gif.gif"
    path_to_your_gif = "/Users/alanyang/Desktop/personal-website/original-11e7a228bdd61e3c09cd39f170f66000.gif"
    
    # 2. Specify the folder where you want to save the extracted frames.
    #    This folder will be created if it doesn't already exist.
    output_directory = "gif_frames_output"
    
    # 3. Call the function with your settings.
    extract_frames_from_local_gif(path_to_your_gif, output_directory, step=12)