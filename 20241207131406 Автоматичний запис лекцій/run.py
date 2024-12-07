'''
In set time 
check if obs is open 
if not open it 
start recording 
in 80 minutes stop recording 
'''

import obsws_python as obs
cl = obs.ReqClient(host='localhost', port=4455, password='Fu2Xfs5vMePGSIkR', timeout=3)
cl.start_record()
cl.stop_record()
