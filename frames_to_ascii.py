import os
from ascii_magic import AsciiArt

def convert_frames_to_ascii(input_folder, output_folder, columns=100):
    """
    Converts all image files in a folder to ASCII art and saves them as text files.
    This FAILSAFE version instantiates the AsciiArt object directly.

    Args:
        input_folder (str): The folder containing the image frames.
        output_folder (str): The folder where the ASCII art text files will be saved.
        columns (int): The width of the output ASCII art in characters.
    """
    
    # --- 1. Check folders ---
    if not os.path.exists(input_folder):
        print(f"Error: The input folder '{input_folder}' was not found.")
        return
    if not os.path.exists(output_folder):
        print(f"Creating directory for ASCII art: {output_folder}")
        os.makedirs(output_folder)
        
    # --- 2. Get image files ---
    try:
        image_files = [f for f in os.listdir(input_folder) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        if not image_files:
            print(f"No image files were found in '{input_folder}'.")
            return
        print(f"Found {len(image_files)} frames to convert in '{input_folder}'.")
    except FileNotFoundError:
        print(f"Error: Input directory '{input_folder}' not found.")
        return

    # --- 3. Loop and convert ---
    for image_file in sorted(image_files):
        image_path = os.path.join(input_folder, image_file)
        
        try:
            # --- FAILSAFE METHOD ---
            # 1. Initialize the AsciiArt object
            my_art = AsciiArt() 
            # 2. Call the 'from_image' method on the OBJECT, not the CLASS
            output_text = my_art.from_image(image_path, columns=columns)
            # --- END OF FAILSAFE METHOD ---
            
            # Create a corresponding filename for the output text file
            base_filename = os.path.splitext(image_file)[0]
            output_path = os.path.join(output_folder, f"{base_filename}_ascii.txt")
            
            # Save the generated ASCII art to the text file
            with open(output_path, 'w', encoding='utf-8') as f:
                f.write(output_text)
            
            print(f"  - Converted '{image_file}' and saved to '{output_path}'")

        except Exception as e:
            # Provide a more detailed error message
            print(f"Could not process {image_file}. Reason: {e}")
            import traceback
            traceback.print_exc() # This will give us a full error trace if it fails again

    print(f"\nConversion complete.")


# --- HOW TO USE THE SCRIPT ---
if __name__ == "__main__":
    input_frames_folder = "gif_frames_output"
    output_ascii_folder = "ascii_art_output"
    ascii_width = 120 
    
    convert_frames_to_ascii(input_frames_folder, output_ascii_folder, columns=ascii_width)