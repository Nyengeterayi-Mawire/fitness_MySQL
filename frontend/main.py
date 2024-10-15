import requests 
from tkinter import *

runs = [] 

def render(window): 
    global runs

    response = requests.get('http://localhost:3001/workout')  
    if response.status_code==200:
        runs = response.json()
        
    else :
        print('Error',response.json())
    

    for run in runs:
        run_Frame = Frame(window)
        run_Frame.pack()
        Label(run_Frame,text=f'Duration : ${run.get('Duration')}')

def main():      
    window = Tk()  
    

    new_run_frame = Frame(window)
    new_run_frame.pack()
    filter_frame = Frame(window)
    new_run_frame.pack()
    results_frame = Frame(window)
    new_run_frame.pack()

    Button(new_run_frame,text='Add run').pack()

    
    
    render(window)
     
    window.mainloop()
    


if __name__ == '__main__' :
    main()