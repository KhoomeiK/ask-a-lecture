import re

def parse_file(file, grouped=True, n=3):
    """
    Parse input text file (accepts .vtt file or text copied from Zoom webpage)
    Parameters:
        file (str): file name
    Returns:
        list of tuples (time in HH:MM:SS format (str), sentence text (str))
    """
    with open(file) as f:
        lines = f.readlines()
    if lines[0].strip() == 'WEBVTT':
        parsed = parse_vtt(lines)
    else:
        parsed = parse_copied(lines)

    if grouped:
        parsed = group_sents(parsed, n=n)

    return parsed

def group_sents(sents, n=3):
    results = []
    for i in range(0, len(sents), n):  
        chunk = sents[i:i+n] 
        text = ' '.join([sent[1] for sent in chunk])
        results.append((chunk[0][0], text))
    return results

def parse_vtt(lines):
    """Parse lines from vtt file"""
    results = []
    lines = lines[1:]
    
    start_index = 0
    while start_index+4 < len(lines):
        results.append(read_chunk(lines, start_index))
        start_index += 4
    return results

def parse_copied(lines):
    """Parse lines from text copied from a Zoom webpage"""
    results = []
    index = 0
    while index < len(lines):
        line = lines[index].strip()
        if line == "user avatar":
            index += 2 # skip next line as well
            continue
        if index + 1 >= len(lines):
            break
        time = standardize_time(line)
        text = lines[index+1].strip()
        results.append((time, text))
        index += 2
    return results

def read_chunk(lines, start_index):
    """Parse a chunk (one sentence) of vtt lines"""
    id_ = int(lines[start_index+1].strip())
    time = lines[start_index+2].strip().split('-->')[0].strip()
    text = lines[start_index+3].strip().split(':')[1].strip()
    # return (id_, time, text)
    return (time, text)

def standardize_time(time):
    """
    Formats input time string into HH:MM:SS
    If the time cannot be parsed, raises ValueError
    """
    if re.match("\d\d:\d\d:\d\d.\d\d\d", time):
        return time
    elif re.match("\d\d:\d\d:\d\d", time):
        return time + ".000"
    elif re.match("\d\d:\d\d", time):
        return "00:" + time + ".000"
    elif re.match("\d\d", time):
        return "00:00:" + time + ".000"
    else:
        raise ValueError("Cannot recognize timstamp format")

