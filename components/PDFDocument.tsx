import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import { cvData } from '@/data';

// Register a clean font (optional, using default Helvetica/Times-Roman is most stable)
// But for a pro look, we can define styles.

const styles = StyleSheet.create({
  page: {
    padding: 28,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    borderBottomWidth: 1.5,
    borderBottomColor: '#111827',
    paddingBottom: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 10,
    color: '#78350f', // amber-900
    fontWeight: 'bold',
    marginBottom: 3,
    textTransform: 'uppercase',
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    fontSize: 8.2,
    color: '#4b5563',
  },
  section: {
    marginBottom: 9,
  },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottomWidth: 0.8,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 2,
    marginBottom: 5,
  },
  summary: {
    fontSize: 8.8,
    color: '#374151',
    lineHeight: 1.38,
    textAlign: 'justify',
  },
  experienceItem: {
    marginBottom: 7,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  role: {
    fontSize: 9.8,
    fontWeight: 'bold',
    color: '#111827',
  },
  companyDate: {
    fontSize: 8.2,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  companySub: {
    fontSize: 8.2,
    color: '#78350f',
    fontWeight: 'bold',
    backgroundColor: '#fffdfa',
    padding: '1 3',
    marginBottom: 2,
  },
  achievement: {
    fontSize: 8.5,
    color: '#4b5563',
    marginLeft: 10,
    marginBottom: 1.5,
    lineHeight: 1.32,
  },
  skillsGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  skillColumn: {
    flex: 1,
  },
  skillLabel: {
    fontSize: 7.2,
    fontWeight: 'bold',
    color: '#9ca3af',
    marginBottom: 2,
  },
  skillText: {
    fontSize: 8.2,
    color: '#374151',
    lineHeight: 1.3,
  },
  eduGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  eduTitle: {
    fontSize: 9.2,
    fontWeight: 'bold',
    color: '#111827',
  },
  gpa: {
    fontSize: 7.8,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#78350f',
    padding: '1 3',
    borderRadius: 2,
  },
  projectItem: {
    marginBottom: 4,
  },
  projectName: {
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  projectDesc: {
    fontSize: 7.8,
    color: '#6b7280',
    lineHeight: 1.2,
  }
});

const PDFDocument = () => {
  const { personalInfo, summary, skills, workExperience, education, projects, achievements } = cvData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.name}</Text>
          <Text style={styles.title}>{personalInfo.title}</Text>
          <View style={styles.contactRow}>
            <Text>{personalInfo.phone} | {personalInfo.email} | {personalInfo.location}</Text>
          </View>
          <View style={[styles.contactRow, { marginTop: 2 }]}>
            <Text>{personalInfo.linkedin} | {personalInfo.github} | {personalInfo.portfolio}</Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{summary}</Text>
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle} minPresenceAhead={60}>Professional Experience</Text>
          {workExperience.map((work, index) => (
            <View key={index} style={styles.experienceItem}>
              <View wrap={false}>
                <View style={styles.experienceHeader}>
                  <Text style={styles.role}>{work.role}</Text>
                  <Text style={styles.companyDate}>{work.dates.toUpperCase()}</Text>
                </View>
                <Text style={styles.companySub}>{work.company.toUpperCase()} | {work.location}</Text>
                {work.achievements.length > 0 && (
                  <Text style={styles.achievement}>• {work.achievements[0]}</Text>
                )}
              </View>
              {work.achievements.slice(1).map((ach, idx) => (
                <Text key={idx} style={styles.achievement} wrap={false}>• {ach}</Text>
              ))}
            </View>
          ))}
        </View>

        {/* Skills */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Technical Expertise</Text>
          <View style={styles.skillsGrid}>
            <View style={styles.skillColumn}>
              <Text style={styles.skillLabel}>HARD SKILLS</Text>
              <Text style={styles.skillText}>{skills.hardSkills.join(" • ")}</Text>
            </View>
            <View style={styles.skillColumn}>
              <Text style={styles.skillLabel}>TOOLS & ENVIRONMENT</Text>
              <Text style={styles.skillText}>{skills.tools.join(" • ")}</Text>
            </View>
          </View>
        </View>

        {/* Education & Projects */}
        <View style={{ flexDirection: 'row', gap: 20, marginBottom: 8 }} wrap={false}>
          <View style={{ flex: 1 }}>
            <Text style={styles.sectionTitle}>Education</Text>
            <View style={styles.eduGrid}>
              <Text style={styles.eduTitle}>{education.degree}</Text>
              <Text style={styles.companyDate}>{education.dates}</Text>
            </View>
            <Text style={[styles.skillText, { fontWeight: 'bold' }]}>{education.school}</Text>
            <View style={{ marginTop: 2 }}>
              <Text style={styles.gpa}>GPA: {education.gpa}</Text>
            </View>
            <Text style={[styles.skillText, { fontSize: 7.2, marginTop: 2, color: '#9ca3af' }]}>
              {education.details}
            </Text>
          </View>

          <View style={{ flex: 1.4 }}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {projects.slice(0, 5).map((project, index) => (
              <View key={index} style={styles.projectItem}>
                <Text style={styles.projectName}>• {project.name}</Text>
                <Text style={styles.projectDesc}>{project.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>Achievements & Volunteering</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {achievements.map((item, index) => (
                <View key={index} style={{ width: '48%', marginBottom: 3, borderBottomWidth: 0.5, borderBottomColor: '#f3f4f6', paddingBottom: 1 }}>
                  <Text style={{ fontSize: 8.2, fontWeight: 'bold', color: '#111827' }}>{item.title}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 1 }}>
                    <Text style={{ fontSize: 7.2, color: '#78350f', fontWeight: 'bold' }}>{item.role.toUpperCase()}</Text>
                    <Text style={{ fontSize: 7.2, color: '#9ca3af' }}>{item.year}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default PDFDocument;
